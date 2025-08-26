const ConfigBadge = () => {
  return (
    <div className="fixed top-4 right-4 z-50">
      <div className="bg-white/90 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg border border-orange-200">
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
          <span className="text-sm font-medium text-gray-700">SSR Enabled</span>
        </div>
      </div>
    </div>
  );
};

export default ConfigBadge;
