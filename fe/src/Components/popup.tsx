type PopupProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

export const Popup = ({ isOpen, onClose, children }: PopupProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-600 text-black p-6 rounded-lg shadow-lg max-w-md w-full relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-lg font-bold text-red-600 hover:text-red-800"
        >
          ×
        </button>
        {children}
      </div>
    </div>
  );
};
