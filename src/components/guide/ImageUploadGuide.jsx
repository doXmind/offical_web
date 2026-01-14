import React from 'react';
import { motion } from 'framer-motion';
import { Image, Upload, Clipboard, Eye, FileText, BarChart3, Layout, Camera } from 'lucide-react';

const imageFormats = [
  { format: 'JPEG', maxSize: '5MB' },
  { format: 'PNG', maxSize: '5MB' },
  { format: 'GIF', maxSize: '5MB' },
  { format: 'WebP', maxSize: '5MB' }
];

const uploadMethods = [
  {
    icon: Clipboard,
    title: 'Paste from Clipboard',
    shortcut: 'Ctrl+V',
    description: 'Copy any image and paste directly into chat'
  },
  {
    icon: Upload,
    title: 'Drag & Drop',
    description: 'Drag images directly into the chat area'
  },
  {
    icon: Image,
    title: 'Click to Upload',
    description: 'Click the image icon in the chat input'
  }
];

const useCases = [
  {
    icon: Layout,
    title: 'Design Mockups',
    description: 'Get feedback on UI designs and wireframes'
  },
  {
    icon: FileText,
    title: 'Text Extraction',
    description: 'Extract text from images and screenshots'
  },
  {
    icon: BarChart3,
    title: 'Charts & Data',
    description: 'Analyze charts, graphs, and visualizations'
  },
  {
    icon: Camera,
    title: 'Photos',
    description: 'Get descriptions and insights from photos'
  }
];

const ImageUploadGuide = () => {
  return (
    <div className="space-y-8">
      {/* Format Support */}
      <div>
        <h4 className="text-xl font-light mb-4">Supported Formats</h4>
        <div className="flex flex-wrap gap-3 mb-4">
          {imageFormats.map((format, index) => (
            <motion.div
              key={format.format}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              viewport={{ once: true }}
              className="px-4 py-2 border border-white/10 rounded-lg bg-white/5"
            >
              <span className="font-medium text-white">{format.format}</span>
              <span className="text-xs text-gray-400 ml-2">{format.maxSize}</span>
            </motion.div>
          ))}
        </div>
        <div className="p-4 border border-white/10 rounded-lg bg-white/5">
          <p className="text-sm text-gray-400">
            <Eye className="w-4 h-4 inline mr-2" />
            Up to <strong className="text-white">10 images</strong> per message
          </p>
        </div>
      </div>

      {/* Upload Methods */}
      <div>
        <h4 className="text-xl font-light mb-4">How to Upload</h4>
        <div className="grid md:grid-cols-3 gap-4">
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
                  <div className="flex items-center gap-2 mb-1">
                    <h5 className="font-medium text-white">{method.title}</h5>
                    {method.shortcut && (
                      <kbd className="text-xs px-2 py-0.5 bg-white/10 rounded text-gray-400">
                        {method.shortcut}
                      </kbd>
                    )}
                  </div>
                  <p className="text-sm text-gray-400">{method.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Use Cases */}
      <div>
        <h4 className="text-xl font-light mb-4">What AI Can Analyze</h4>
        <div className="grid md:grid-cols-2 gap-4">
          {useCases.map((useCase, index) => (
            <motion.div
              key={useCase.title}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              viewport={{ once: true }}
              className="p-4 border border-white/10 rounded-lg bg-white/5 hover:border-white/20 transition-colors"
            >
              <div className="flex items-start gap-3">
                <useCase.icon className="w-5 h-5 text-white mt-0.5 flex-shrink-0" />
                <div>
                  <h5 className="font-medium text-white mb-1">{useCase.title}</h5>
                  <p className="text-sm text-gray-400">{useCase.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImageUploadGuide;
