import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Presentation, File } from 'lucide-react';

const iconMap = {
  pdf: FileText,
  docx: FileText,
  pptx: Presentation,
  md: File,
  markdown: File,
  jpeg: File,
  png: File,
  gif: File,
  webp: File,
};

const FileFormatTable = ({ formats, title, className = '' }) => {
  return (
    <div className={className}>
      {title && (
        <h4 className="text-xl font-light mb-4">{title}</h4>
      )}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {formats.map((format, index) => {
          const IconComponent = format.icon || iconMap[format.format?.toLowerCase()] || FileText;
          return (
            <motion.div
              key={format.format}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              viewport={{ once: true }}
              className="p-4 border border-white/10 rounded-lg bg-white/5 hover:border-white/20 transition-colors"
            >
              <div className="flex items-start gap-3">
                <IconComponent className="w-5 h-5 text-white mt-0.5 flex-shrink-0" />
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium text-white">{format.format}</span>
                    {format.maxSize && (
                      <span className="text-xs px-2 py-0.5 bg-white/10 rounded text-gray-400">
                        {format.maxSize}
                      </span>
                    )}
                  </div>
                  {format.description && (
                    <p className="text-sm text-gray-400">{format.description}</p>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default FileFormatTable;
