import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Tag } from 'lucide-react';
import { cn } from '../../core/utils';
import VersionBadge from './VersionBadge';
import ChangeList from './ChangeList';

const releaseTypeConfig = {
  feature: {
    label: 'Feature Release',
    color: 'text-white',
    bgColor: 'bg-white/10',
  },
  bugfix: {
    label: 'Bug Fix',
    color: 'text-gray-300',
    bgColor: 'bg-gray-500/10',
  },
  security: {
    label: 'Security Update',
    color: 'text-orange-400',
    bgColor: 'bg-orange-500/10',
  },
  maintenance: {
    label: 'Maintenance',
    color: 'text-gray-400',
    bgColor: 'bg-gray-600/10',
  },
};

const ReleaseCard = ({ release, index = 0 }) => {
  const typeConfig = releaseTypeConfig[release.type] || releaseTypeConfig.feature;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative"
    >
      {/* Timeline dot */}
      <div className="absolute -left-[41px] top-0 w-4 h-4 rounded-full bg-white/20 border-2 border-white/40" />

      {/* Card */}
      <div className="p-6 border border-white/10 rounded-lg bg-white/5 hover:border-white/20 transition-colors">
        {/* Header */}
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <VersionBadge version={release.version} />
          <span className={cn(
            'inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs',
            typeConfig.bgColor,
            typeConfig.color
          )}>
            <Tag className="w-3 h-3" />
            {typeConfig.label}
          </span>
          <span className="flex items-center gap-1 text-sm text-gray-500">
            <Calendar className="w-4 h-4" />
            {formatDate(release.date)}
          </span>
        </div>

        {/* Title & Summary */}
        <h3 className="text-xl font-light text-white mb-2">{release.title}</h3>
        <p className="text-gray-400 mb-6">{release.summary}</p>

        {/* Changes */}
        <ChangeList changes={release.changes} />
      </div>
    </motion.article>
  );
};

export default ReleaseCard;
