interface PopupProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export default function Popup({ isOpen, onClose, children }: PopupProps) {
  if (!isOpen) {
    return null;
  }
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="relative bg-black bg-opacity-90 px-10 py-8 m-5 rounded-lg shadow-lg w-[90%] max-w-md">
        <button
          className="absolute top-2 right-3 text-white text-2xl hover:text-red-500 transition-colors"
          onClick={onClose}
        >
          &times;
        </button>
        {children}
      </div>
    </div>
  );
}