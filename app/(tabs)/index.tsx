import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import JSZip from 'jszip';
import { useRouter } from 'expo-router';
import { Upload } from 'lucide-react-native';

export default function UploadScreen() {
  const [uploading, setUploading] = useState(false);
  const router = useRouter();

  const handleFileUpload = async () => {
    try {
      setUploading(true);
      const result = await DocumentPicker.getDocumentAsync({
        type: 'application/zip',
        copyToCacheDirectory: true
      });

      if (result.canceled) {
        return;
      }

      let fileContent: string;
      
      if (Platform.OS === 'web') {
        // For web, use FileReader API
        const response = await fetch(result.assets[0].uri);
        const blob = await response.blob();
        fileContent = await new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => {
            // Remove 'data:application/zip;base64,' from the start
            const base64 = reader.result as string;
            resolve(base64.split(',')[1]);
          };
          reader.onerror = reject;
          reader.readAsDataURL(blob);
        });
      } else {
        // For native platforms, use expo-file-system
        fileContent = await FileSystem.readAsStringAsync(result.assets[0].uri, {
          encoding: FileSystem.EncodingType.Base64,
        });
      }

      const zip = new JSZip();
      const contents = await zip.loadAsync(fileContent, { base64: true });
      
      const textFiles: { name: string; content: string }[] = [];

      for (const [filename, file] of Object.entries(contents.files)) {
        if (!file.dir && filename.endsWith('.txt')) {
          const content = await file.async('string');
          textFiles.push({ name: filename, content });
        }
      }

      // Store the files in memory (in a real app, you'd want to use proper state management)
      global.extractedFiles = textFiles;
      
      router.push('/files');
    } catch (error) {
      console.error('Error uploading file:', error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.uploadArea}>
        <Upload size={48} color="#007AFF" />
        <Text style={styles.title}>Upload ZIP File</Text>
        <Text style={styles.subtitle}>Select a ZIP file containing text files</Text>
        <TouchableOpacity
          style={[styles.button, uploading && styles.buttonDisabled]}
          onPress={handleFileUpload}
          disabled={uploading}>
          <Text style={styles.buttonText}>
            {uploading ? 'Processing...' : 'Choose File'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  uploadArea: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 16,
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginTop: 8,
    marginBottom: 24,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    ...Platform.select({
      web: {
        cursor: 'pointer',
      },
    }),
  },
  buttonDisabled: {
    backgroundColor: '#ccc',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});