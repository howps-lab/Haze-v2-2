/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Share2, Copy, Check, X, MessageCircle, Send, Heart } from 'lucide-react';
import { HazeReadingState, RegionKey } from '../types/haze';
import { classifyPm25 } from '../utils/hazeClassifier';

interface ShareModalProps {
  readingState: HazeReadingState | null;
  selectedRegion: RegionKey;
  isOpen: boolean;
  onClose: () => void;
}

export const ShareModal: React.FC<ShareModalProps> = ({
  readingState,
  selectedRegion,
  isOpen,
  onClose,
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const currentVal = readingState ? readingState.regions[selectedRegion].pm25 : 0;
  const category = classifyPm25(currentVal);
  const regionLabel = readingState?.regions[selectedRegion].label || 'Singapore';

  const shareTitle = `Singapore Haze Update (${regionLabel}): ${currentVal} µg/m³ (${category.descriptor})`;
  const shareText = `Stay safe! Singapore's 1-hour PM2.5 in ${regionLabel} is currently ${currentVal} µg/m³ (${category.descriptor} range). Check real-time air quality & health advisories here:`;
  const shareUrl = typeof window !== 'undefined' ? window.location.href : 'https://www.haze.gov.sg/';

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(`${shareTitle}\n${shareText}\n${shareUrl}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback
    }
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: shareTitle,
          text: shareText,
          url: shareUrl,
        });
        onClose();
      } catch {
        // User cancelled or unsupported
      }
    } else {
      handleCopy();
    }
  };

  const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(
    `${shareTitle}\n\n${shareText}\n${shareUrl}`
  )}`;

  const telegramUrl = `https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(
    `${shareTitle} - ${shareText}`
  )}`;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/60 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-navy-100 relative text-left"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          type="button"
          aria-label="Close modal"
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 mb-2">
          <div className="w-10 h-10 rounded-2xl bg-rose-100 text-[#D9272E] flex items-center justify-center">
            <Heart className="w-5 h-5 fill-current" />
          </div>
          <div>
            <h3 className="font-heading text-2xl font-black text-[#102D50] uppercase tracking-tight">
              Share With Family & Friends
            </h3>
            <p className="text-xs text-slate-500 font-medium">
              Help your loved ones stay safe during the haze
            </p>
          </div>
        </div>

        {/* Live status badge inside modal */}
        <div className="my-4 p-3.5 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
              {regionLabel} 1-Hour PM2.5
            </span>
            <div className="flex items-baseline gap-1.5 mt-0.5">
              <span className="font-heading text-3xl font-black text-[#102D50] leading-none">
                {currentVal}
              </span>
              <span className="text-xs font-bold text-slate-500">µg/m³</span>
            </div>
          </div>
          <span
            className={`px-3 py-1.5 rounded-full text-xs font-bold ${category.badgeBg} ${category.badgeText}`}
          >
            {category.descriptor}
          </span>
        </div>

        {/* Share buttons */}
        <div className="space-y-2.5">
          {typeof navigator !== 'undefined' && 'share' in navigator && (
            <button
              type="button"
              onClick={handleNativeShare}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#D9272E] hover:bg-[#b91c22] text-white font-bold text-sm shadow-md transition-all cursor-pointer"
            >
              <Share2 className="w-4 h-4" />
              <span>Share via System Share Sheet</span>
            </button>
          )}

          <div className="grid grid-cols-2 gap-2">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-xs shadow-xs transition-all"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp</span>
            </a>
            <a
              href={telegramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-[#229ED9] hover:bg-[#1d8cc1] text-white font-bold text-xs shadow-xs transition-all"
            >
              <Send className="w-4 h-4" />
              <span>Telegram</span>
            </a>
          </div>

          <button
            type="button"
            onClick={handleCopy}
            className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-700 font-semibold text-xs transition-all cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-600" />
                <span className="text-emerald-700 font-bold">Copied to Clipboard!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>Copy Summary Link to Clipboard</span>
              </>
            )}
          </button>
        </div>

        <p className="text-[11px] text-slate-400 text-center mt-4">
          Data source: Singapore National Environment Agency (NEA) & Haze.gov.sg
        </p>
      </div>
    </div>
  );
};
