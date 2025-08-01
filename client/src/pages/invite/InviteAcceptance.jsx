import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Users, Mail, Calendar, CheckCircle, XCircle } from "lucide-react";
import fetcher from "../../lib/api";

const InviteAcceptancePage = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [accepting, setAccepting] = useState(false);
  const [inviteData, setInviteData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchInviteData = async () => {
      try {
        setLoading(true);
        const res = await fetcher(`/invites/${token}`);

        setInviteData(res);
      } catch (err) {
        setError("Failed to load invite information");
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchInviteData();
    } else {
      setError("Invalid invite link");
      setLoading(false);
    }
  }, [token]);

  const handleAcceptInvite = async () => {
    try {
      setAccepting(true);

      const res = await fetcher(`/invites/${token}/accept`, {
        method: "POST",
      });
      navigate(`/project/${res.projectId}`);
    } catch (err) {
      setError(err.message);
    } finally {
      setAccepting(false);
    }
  };

  const handleCancel = () => {
    navigate("/dashboard");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-500 mx-auto mb-4"></div>
          <p className="text-zinc-400">Loading invite...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-4">
        <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-8 max-w-md w-full text-center">
          <div className="mb-6">
            <XCircle className="h-16 w-16 text-red-400 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-white mb-2">
              Invalid Invite
            </h1>
            <p className="text-zinc-400">{error}</p>
          </div>
          <button
            onClick={handleCancel}
            className="w-full bg-zinc-800 hover:bg-zinc-700 text-white px-4 py-2 rounded-md transition-colors"
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-4">
      <div className="bg-zinc-900 border border-zinc-800 rounded-lg shadow-xl max-w-lg w-full">
        {/* Header */}
        <div className="p-6 border-b border-zinc-800">
          <div className="text-center">
            <Mail className="h-12 w-12 text-teal-400 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-white mb-2">
              Project Invitation
            </h1>
            <p className="text-zinc-400">
              You've been invited to join a project
            </p>
          </div>
        </div>

        {/* Project Info */}
        <div className="p-6 space-y-4">
          <div className="bg-zinc-800/50 rounded-lg p-4">
            <div className="flex items-start gap-3 mb-3">
              <Users className="h-5 w-5 text-teal-400 mt-0.5 flex-shrink-0" />
              <div className="min-w-0 flex-1">
                <h2 className="font-semibold text-white text-lg mb-1">
                  {inviteData?.project.name}
                </h2>
                {inviteData?.project.description && (
                  <p className="text-zinc-300 text-sm leading-relaxed">
                    {inviteData.project.description}
                  </p>
                )}
              </div>
            </div>
          </div>

          {inviteData?.createdBy && (
            <div className="flex items-center gap-3 text-sm text-zinc-400">
              <div className="w-8 h-8 bg-gradient-to-br from-zinc-700 to-zinc-800 rounded-full flex items-center justify-center text-zinc-300 font-medium text-xs">
                {inviteData.createdBy.name?.charAt(0)?.toUpperCase() || "U"}
              </div>
              <div>
                <p>
                  Invited by{" "}
                  <span className="text-zinc-300 font-medium">
                    {inviteData.createdBy.name}
                  </span>
                </p>
                <p className="text-xs">{inviteData.createdBy.email}</p>
              </div>
            </div>
          )}

          {inviteData?.expiresAt && (
            <div className="flex items-center gap-2 text-sm text-zinc-400">
              <Calendar className="h-4 w-4" />
              <span>
                Expires: {new Date(inviteData.expiresAt).toLocaleDateString()}
              </span>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="p-6 border-t border-zinc-800">
          <div className="flex gap-3">
            <button
              onClick={handleCancel}
              className="flex-1 px-4 py-2 text-sm font-medium text-zinc-300 bg-zinc-800 border border-zinc-700 rounded-md hover:bg-zinc-700 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleAcceptInvite}
              disabled={accepting}
              className="flex-1 px-4 py-2 text-sm font-medium bg-teal-600 hover:bg-teal-700 disabled:bg-blue-600/50 text-white rounded-md transition-colors flex items-center justify-center gap-2"
            >
              {accepting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Accepting...
                </>
              ) : (
                <>
                  <CheckCircle className="h-4 w-4" />
                  Accept Invite
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InviteAcceptancePage;
