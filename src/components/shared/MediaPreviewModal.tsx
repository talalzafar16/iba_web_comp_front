import { motion } from "framer-motion";

// @ts-expect-error jk jk
export default function MediaPreviewModal({ media, onClose }) {
  if (!media) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.3 }}
        className="bg-gray-900 p-6 rounded-lg shadow-lg max-w-2xl w-full relative"
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-400 hover:text-white"
        >
          ✖
        </button>

        {media.type === "video" ? (
          <video controls autoPlay className="w-full rounded-lg">
            <source src={media.src} type="video/mp4" />
          </video>
        ) : (
          <img src={media.src} alt="Preview" className="w-full rounded-lg object-cover" />
        )}
      </motion.div>
    </motion.div>
  );
}
