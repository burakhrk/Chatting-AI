import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform } from 'react-native';
import { FileText, ChevronRight } from 'lucide-react-native';

declare global {
  var extractedFiles: { name: string; content: string }[];
}

export default function FilesScreen() {
  const [selectedFile, setSelectedFile] = useState<{ name: string; content: string } | null>(null);

  const files = global.extractedFiles || [];

  if (files.length === 0) {
    return (
      <View style={styles.container}>
        <View style={styles.emptyState}>
          <FileText size={48} color="#999" />
          <Text style={styles.emptyText}>No files uploaded yet</Text>
          <Text style={styles.emptySubtext}>Upload a ZIP file to view its contents</Text>
        </View>
      </View>
    );
  }

  if (selectedFile) {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => setSelectedFile(null)}>
          <Text style={styles.backButtonText}>← Back to files</Text>
        </TouchableOpacity>
        <View style={styles.fileHeader}>
          <Text style={styles.fileName}>{selectedFile.name}</Text>
        </View>
        <ScrollView style={styles.contentContainer}>
          <Text style={styles.fileContent}>{selectedFile.content}</Text>
        </ScrollView>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        {files.map((file, index) => (
          <TouchableOpacity
            key={index}
            style={styles.fileItem}
            onPress={() => setSelectedFile(file)}>
            <FileText size={24} color="#007AFF" />
            <Text style={styles.fileItemText}>{file.name}</Text>
            <ChevronRight size={20} color="#999" />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#999',
    marginTop: 16,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#999',
    marginTop: 8,
  },
  fileItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    ...Platform.select({
      web: {
        cursor: 'pointer',
      },
    }),
  },
  fileItemText: {
    flex: 1,
    fontSize: 16,
    marginLeft: 12,
    color: '#333',
  },
  backButton: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    ...Platform.select({
      web: {
        cursor: 'pointer',
      },
    }),
  },
  backButtonText: {
    color: '#007AFF',
    fontSize: 16,
  },
  fileHeader: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  fileName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  contentContainer: {
    flex: 1,
    padding: 16,
  },
  fileContent: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
  },
});