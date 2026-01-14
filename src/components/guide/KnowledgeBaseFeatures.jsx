import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Presentation, Upload, Search, BookOpen } from 'lucide-react';

const fileTypes = [
  {
    format: 'PDF',
    icon: FileText,
    maxSize: '50MB',
    description: 'Research papers, reports, documentation'
  },
  {
    format: 'DOCX',
    icon: FileText,
    maxSize: '50MB',
    description: 'Word documents, articles, notes'
  },
  {
    format: 'PPTX',
    icon: Presentation,
    maxSize: '50MB',
    description: 'Presentations and slide decks'
  }
];

const uploadMethods = [
  {
    icon: Upload,
    title: 'Drag & Drop',
    description: 'Drag files directly into the chat panel'
  },
  {
    icon: Upload,
    title: 'Click to Upload',
    description: 'Click the attachment icon in the chat input'
  }
];

const aiTools = [
  {
    name: 'search_knowledge_base',
    description: 'Semantic search across all uploaded documents'
  },
  {
    name: 'read_kb_document',
    description: 'Read specific content from a document'
  },
  {
    name: 'list_kb_documents',
    description: 'List all available documents in the knowledge base'
  }
];

const KnowledgeBaseFeatures = () => {
  return (
    <div className="space-y-8">
      {/* Supported File Types */}
      <div>
        <h4 className="text-xl font-light mb-4">Supported File Types</h4>
        <div className="grid md:grid-cols-3 gap-4">
          {fileTypes.map((file, index) => (
            <motion.div
              key={file.format}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              viewport={{ once: true }}
              className="p-4 border border-white/10 rounded-lg bg-white/5 hover:border-white/20 transition-colors"
            >
              <div className="flex items-start gap-3">
                <file.icon className="w-5 h-5 text-white mt-0.5 flex-shrink-0" />
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium text-white">{file.format}</span>
                    <span className="text-xs px-2 py-0.5 bg-white/10 rounded text-gray-400">
                      {file.maxSize}
                    </span>
                  </div>
                  <p className="text-sm text-gray-400">{file.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Upload Methods */}
      <div>
        <h4 className="text-xl font-light mb-4">How to Upload</h4>
        <div className="grid md:grid-cols-2 gap-4">
          {uploadMethods.map((method, index) => (
            <motion.div
              key={method.title}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              viewport={{ once: true }}
              className="p-4 border border-white/10 rounded-lg bg-white/5 hover:border-white/20 transition-colors"
            >
              <div className="flex items-start gap-3">
                <method.icon className="w-5 h-5 text-white mt-0.5 flex-shrink-0" />
                <div>
                  <h5 className="font-medium text-white mb-1">{method.title}</h5>
                  <p className="text-sm text-gray-400">{method.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* AI Tools */}
      <div>
        <h4 className="text-xl font-light mb-4">AI Capabilities</h4>
        <div className="p-6 border border-white/10 rounded-lg bg-white/5">
          <p className="text-gray-400 mb-4">
            Once documents are uploaded, the AI can use these tools to help you:
          </p>
          <div className="space-y-3">
            {aiTools.map((tool, index) => (
              <motion.div
                key={tool.name}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                viewport={{ once: true }}
                className="flex items-start gap-3"
              >
                <Search className="w-4 h-4 text-white mt-1 flex-shrink-0" />
                <div>
                  <code className="text-sm px-2 py-0.5 bg-white/10 rounded text-white">
                    {tool.name}
                  </code>
                  <span className="text-sm text-gray-400 ml-2">{tool.description}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default KnowledgeBaseFeatures;
