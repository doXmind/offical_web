import React, { useEffect, Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { X, Maximize2 } from 'lucide-react';
import { motion } from 'framer-motion';

const LightboxModal = ({ isOpen, onClose, media, title = '' }) => {
  // Close on escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!media) return null;

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-[100]" onClose={onClose}>
        {/* Backdrop */}
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/95 backdrop-blur-xl" />
        </Transition.Child>

        {/* Modal content */}
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-7xl transform overflow-hidden transition-all">
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                  <Dialog.Title className="text-lg font-semibold text-white">
                    {title}
                  </Dialog.Title>
                  <button
                    onClick={onClose}
                    className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-all"
                    aria-label="Close lightbox"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                {/* Media container */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="relative bg-gray-900/50 rounded-2xl overflow-hidden border border-white/10"
                >
                  {media.type === 'video' ? (
                    <video
                      src={media.src}
                      controls
                      autoPlay
                      loop
                      className="w-full h-auto max-h-[85vh] object-contain"
                      aria-label={title || 'Video demo'}
                    />
                  ) : (
                    <img
                      src={media.src}
                      alt={title || 'Demo'}
                      className="w-full h-auto max-h-[85vh] object-contain"
                    />
                  )}
                </motion.div>

                {/* Hint */}
                <div className="mt-4 text-center">
                  <p className="text-sm text-gray-500">
                    Press <kbd className="px-2 py-1 bg-gray-800 rounded text-gray-300">ESC</kbd> to close
                  </p>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default LightboxModal;
