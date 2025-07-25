// View Sprint Component
const ViewSprint = ({ sprintData, onEdit }) => {
  const [showDetails, setShowDetails] = useState(false);

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const isActive = () => {
    const now = new Date();
    const start = new Date(sprintData.startDate);
    const end = new Date(sprintData.endDate);
    return now >= start && now <= end;
  };

  return (
    <div className="py-4 border-b border-slate-700/50 last:border-b-0">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h3 className="text-lg font-medium text-white">
              {sprintData.title}
            </h3>
            {isActive() && (
              <span className="px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded-full border border-green-500/30">
                Active
              </span>
            )}
          </div>

          <div className="flex items-center gap-4 text-sm text-slate-400 mb-3">
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <span>
                {formatDate(sprintData.startDate)} –{" "}
                {formatDate(sprintData.endDate)}
              </span>
            </div>
            {sprintData.features?.length > 0 && (
              <div className="flex items-center gap-1">
                <Target className="w-4 h-4" />
                <span>{sprintData.features.length} goals</span>
              </div>
            )}
          </div>

          {showDetails && (
            <div className="space-y-3 mt-4 pl-4 border-l-2 border-teal-500/30">
              {sprintData.description && (
                <div>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    {sprintData.description}
                  </p>
                </div>
              )}

              {sprintData.features?.length > 0 && (
                <div>
                  <h4 className="text-sm font-medium text-slate-200 mb-2">
                    Goals & Features
                  </h4>
                  <ul className="space-y-1">
                    {sprintData.features.map((feature, index) => (
                      <li
                        key={index}
                        className="text-sm text-slate-300 flex items-start gap-2"
                      >
                        <span className="w-1.5 h-1.5 bg-teal-400 rounded-full mt-2 flex-shrink-0"></span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="flex items-center gap-2 ml-4">
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="text-xs text-teal-400 hover:text-teal-300 transition-colors"
          >
            {showDetails ? "Less" : "Details"}
          </button>
          {showDetails && (
            <button
              onClick={onEdit}
              className="flex items-center gap-1 text-xs text-yellow-400 hover:text-yellow-300 transition-colors"
            >
              <Edit3 className="w-3 h-3" />
              Edit
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
