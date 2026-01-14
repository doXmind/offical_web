import React from 'react';
import { motion } from 'framer-motion';
import { Eye, Replace, Plus, FileText, Search, Database, BookOpen, List } from 'lucide-react';

const tools = [
  {
    category: 'Document Editing',
    items: [
      {
        name: 'view_document',
        icon: Eye,
        description: 'View current document content with line numbers'
      },
      {
        name: 'str_replace_editor',
        icon: Replace,
        description: 'Replace text precisely using string matching'
      },
      {
        name: 'insert_text',
        icon: Plus,
        description: 'Insert new content at a specific line'
      },
      {
        name: 'replace_document',
        icon: FileText,
        description: 'Replace the entire document content'
      },
      {
        name: 'search_in_document',
        icon: Search,
        description: 'Search for text within the current document'
      }
    ]
  },
  {
    category: 'Knowledge Base',
    items: [
      {
        name: 'search_knowledge_base',
        icon: Database,
        description: 'Semantic search across all uploaded documents'
      },
      {
        name: 'read_kb_document',
        icon: BookOpen,
        description: 'Read specific content from a knowledge base document'
      },
      {
        name: 'list_kb_documents',
        icon: List,
        description: 'List all documents available in the knowledge base'
      }
    ]
  }
];

const AIToolsList = () => {
  return (
    <div className="space-y-8">
      {tools.map((category, categoryIndex) => (
        <div key={category.category}>
          <h4 className="text-lg font-medium text-white mb-4">{category.category}</h4>
          <div className="overflow-x-auto">
            <table className="w-full border border-white/10 rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-white/5">
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-400 w-1/3">Tool</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-400">Description</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {category.items.map((tool, index) => (
                  <motion.tr
                    key={tool.name}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: (categoryIndex * 5 + index) * 0.03 }}
                    viewport={{ once: true }}
                    className="border-t border-white/5"
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <tool.icon className="w-4 h-4 text-gray-400" />
                        <code className="px-2 py-0.5 bg-white/5 rounded text-white font-mono text-xs">
                          {tool.name}
                        </code>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-gray-400">{tool.description}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AIToolsList;
