import { useState } from 'react';
import { Share2, Twitter, Facebook, Instagram, Copy, Check, MessageCircle, Mail, Linkedin } from 'lucide-react';

export function SocialShare() {
  const [copied, setCopied] = useState(false);
  const [shareMessage, setShareMessage] = useState(false);

  const shareData = {
    title: "🎉 Happy Birthday Eda Saner! 🎂",
    text: "Just experienced the most magical birthday card ever created for amazing Eda! This interactive celebration is absolutely beautiful! ✨🎈💖",
    url: window.location.href,
    hashtags: "HappyBirthdayEda,BirthdayMagic,EdaSaner,SpecialDay,BirthdayWishes"
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: shareData.title,
          text: shareData.text,
          url: shareData.url,
        });
        setShareMessage(true);
        setTimeout(() => setShareMessage(false), 3000);
      } catch (error) {
        console.log('Share cancelled');
      }
    } else {
      // Fallback to copy URL
      handleCopyLink();
    }
  };

  const handleCopyLink = async () => {
    try {
      const fullMessage = `${shareData.title}\n\n${shareData.text}\n\n${shareData.url}`;
      await navigator.clipboard.writeText(fullMessage);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch (error) {
      console.log('Copy failed');
    }
  };

  const handleTwitterShare = () => {
    const twitterText = encodeURIComponent(`${shareData.text} #${shareData.hashtags.replace(/,/g, ' #')}`);
    const twitterUrl = `https://twitter.com/intent/tweet?text=${twitterText}&url=${encodeURIComponent(shareData.url)}`;
    window.open(twitterUrl, '_blank', 'width=600,height=500,scrollbars=yes,resizable=yes');
  };

  const handleFacebookShare = () => {
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareData.url)}&quote=${encodeURIComponent(shareData.text)}`;
    window.open(facebookUrl, '_blank', 'width=600,height=500,scrollbars=yes,resizable=yes');
  };

  const handleLinkedInShare = () => {
    const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareData.url)}&title=${encodeURIComponent(shareData.title)}&summary=${encodeURIComponent(shareData.text)}`;
    window.open(linkedinUrl, '_blank', 'width=600,height=500,scrollbars=yes,resizable=yes');
  };

  const handleWhatsAppShare = () => {
    const whatsappText = encodeURIComponent(`${shareData.title}\n\n${shareData.text}\n\n${shareData.url}`);
    const whatsappUrl = `https://wa.me/?text=${whatsappText}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleEmailShare = () => {
    const subject = encodeURIComponent(shareData.title);
    const body = encodeURIComponent(`${shareData.text}\n\nCheck out this amazing birthday experience: ${shareData.url}`);
    const emailUrl = `mailto:?subject=${subject}&body=${body}`;
    window.location.href = emailUrl;
  };

  const handleInstagramShare = () => {
    const instagramText = `${shareData.title}\n${shareData.text}\n${shareData.url}\n\n#${shareData.hashtags.replace(/,/g, ' #')}`;
    navigator.clipboard.writeText(instagramText);
    alert('🎉 Perfect! The birthday message has been copied to your clipboard!\n\nNow you can:\n📱 Open Instagram\n✨ Create a new post or story\n📝 Paste the message\n💖 Share Eda\'s special day with the world!');
  };

  return (
    <div className="bg-white/90 backdrop-blur-md rounded-3xl p-8 shadow-2xl border-2 border-purple-200 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-4 left-4 text-6xl">🎉</div>
        <div className="absolute bottom-4 right-4 text-6xl">✨</div>
      </div>
      
      <div className="relative z-10">
        <div className="text-center mb-8">
          <h3 className="text-3xl md:text-4xl bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4 font-bold">
            Share Eda's Magic! ✨
          </h3>
          <p className="text-gray-700 text-lg leading-relaxed">
            Help spread the birthday joy and let everyone experience<br />
            this magical celebration created just for Eda! 💖
          </p>
        </div>

        {/* Success message */}
        {shareMessage && (
          <div className="mb-6 p-4 bg-green-100 border border-green-300 rounded-xl text-green-800 text-center animate-fade-in">
            🎉 Thank you for sharing Eda's special day!
          </div>
        )}

        {/* Primary sharing options */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {/* Native Share */}
          <button
            onClick={handleNativeShare}
            className="flex flex-col items-center p-6 bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-2xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105 hover:-translate-y-1"
          >
            <Share2 size={28} className="mb-3" />
            <span className="text-sm font-medium">Share</span>
          </button>

          {/* WhatsApp */}
          <button
            onClick={handleWhatsAppShare}
            className="flex flex-col items-center p-6 bg-gradient-to-br from-green-500 to-green-600 text-white rounded-2xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105 hover:-translate-y-1"
          >
            <MessageCircle size={28} className="mb-3" />
            <span className="text-sm font-medium">WhatsApp</span>
          </button>

          {/* Twitter */}
          <button
            onClick={handleTwitterShare}
            className="flex flex-col items-center p-6 bg-gradient-to-br from-blue-400 to-blue-500 text-white rounded-2xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105 hover:-translate-y-1"
          >
            <Twitter size={28} className="mb-3" />
            <span className="text-sm font-medium">Twitter</span>
          </button>

          {/* Facebook */}
          <button
            onClick={handleFacebookShare}
            className="flex flex-col items-center p-6 bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-2xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105 hover:-translate-y-1"
          >
            <Facebook size={28} className="mb-3" />
            <span className="text-sm font-medium">Facebook</span>
          </button>
        </div>

        {/* Secondary sharing options */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {/* Instagram */}
          <button
            onClick={handleInstagramShare}
            className="flex flex-col items-center p-4 bg-gradient-to-br from-pink-500 to-purple-600 text-white rounded-xl shadow-md hover:shadow-lg transition-all transform hover:scale-105"
          >
            <Instagram size={24} className="mb-2" />
            <span className="text-xs font-medium">Instagram</span>
          </button>

          {/* LinkedIn */}
          <button
            onClick={handleLinkedInShare}
            className="flex flex-col items-center p-4 bg-gradient-to-br from-blue-700 to-blue-800 text-white rounded-xl shadow-md hover:shadow-lg transition-all transform hover:scale-105"
          >
            <Linkedin size={24} className="mb-2" />
            <span className="text-xs font-medium">LinkedIn</span>
          </button>

          {/* Email */}
          <button
            onClick={handleEmailShare}
            className="flex flex-col items-center p-4 bg-gradient-to-br from-indigo-500 to-indigo-600 text-white rounded-xl shadow-md hover:shadow-lg transition-all transform hover:scale-105"
          >
            <Mail size={24} className="mb-2" />
            <span className="text-xs font-medium">Email</span>
          </button>

          {/* Copy Link */}
          <button
            onClick={handleCopyLink}
            className={`flex flex-col items-center p-4 rounded-xl shadow-md hover:shadow-lg transition-all transform hover:scale-105 ${
              copied
                ? 'bg-gradient-to-br from-green-500 to-green-600 text-white'
                : 'bg-gradient-to-br from-gray-500 to-gray-600 text-white'
            }`}
          >
            {copied ? (
              <>
                <Check size={24} className="mb-2" />
                <span className="text-xs font-medium">Copied!</span>
              </>
            ) : (
              <>
                <Copy size={24} className="mb-2" />
                <span className="text-xs font-medium">Copy</span>
              </>
            )}
          </button>
        </div>

        {/* Share statistics */}
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6 text-center">
          <p className="text-lg text-gray-700 mb-2">
            Help make Eda's birthday even more special! 🎈
          </p>
          <p className="text-sm text-gray-600">
            Every share spreads more love and joy for our amazing Eda ✨💖🎂
          </p>
          
          {/* Hashtags for easy copying */}
          <div className="mt-4 p-3 bg-white/60 rounded-lg">
            <p className="text-xs text-gray-600 mb-1">Suggested hashtags:</p>
            <p className="text-sm text-purple-700 font-mono">
              #{shareData.hashtags.replace(/,/g, ' #')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}