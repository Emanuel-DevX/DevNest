import { useEffect, useState } from "react";
import {
  Trash2,
  Save,
  Edit3,
  User,
  Mail,
  Briefcase,
  GraduationCap,
  Shield,
  Calendar,
} from "lucide-react";

const Profile = function () {
  
  return (
    <div className="max-w-2xl w-[20rem] md:w-auto mx-auto lg:px-4 py-10">
      {/* Header Card */}
      <div className="bg-gradient-to-br from-zinc-900/80 to-slate-900/80 backdrop-blur-sm border border-slate-700/50 rounded-2xl lg:p-8 p-2 shadow-2xl mb-6 relative overflow-hidden">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 25% 25%, #22d3ee 0%, transparent 50%), 
                             radial-gradient(circle at 75% 75%, #06b6d4 0%, transparent 50%)`,
            }}
          ></div>
        </div>

        <div className="relative">
          <div className="flex flex-col md:flex-row gap-3 items-start justify-between mb-6">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-6">
                {/* Avatar */}
                <div className="relative group ">
                  <div className="lg:w-20 lg:h-20 w-10 h-10 bg-gradient-to-br from-teal-400 to-cyan-500 rounded-2xl flex items-center justify-center text-white text-2xl font-bold shadow-lg group-hover:shadow-teal-500/25 transition-all duration-300">
                    {user.image ? (
                      <img
                        src={user.image}
                        alt="Avatar"
                        className="w-full h-full rounded-2xl object-cover"
                      />
                    ) : (
                      getInitials(user.name)
                    )}
                  </div>
                  <div className="absolute -bottom-1 -right-1 lg:w-6 lg:h-6 w-4 h-4 bg-green-500 border-2 border-zinc-900 rounded-full"></div>
                </div>

                {/* User Info */}
                <div>
                  <h1 className="text-2xl font-bold text-white mb-1">
                    {user.name}
                  </h1>
                  <p className="text-teal-400 text-xs font-medium flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    {user.email}
                  </p>
                  <p className="text-slate-400 text-sm mt-2 flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    Member since {formatJoinDate(user.joinDate)}
                  </p>
                </div>
              </div>
            </div>
            {!editMode && (
              <button
                onClick={() => setEditMode(true)}
                className="self-center lg:self-end group px-4 py-2 bg-teal-500/10 hover:bg-teal-500/20 border border-teal-500/30 rounded-lg text-teal-400 hover:text-teal-300 transition-all duration-200 flex items-center gap-2"
              >
                <Edit3 className="w-4 h-4 group-hover:rotate-12 transition-transform duration-200" />
                Edit Profile
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Details Card */}
      <div className="bg-gradient-to-br from-zinc-900/80 to-slate-900/80 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8 shadow-2xl relative overflow-hidden">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 75% 25%, #0891b2 0%, transparent 50%)`,
            }}
          ></div>
        </div>

        <div className="relative">
          <div className="flex items-center gap-3 mb-6">
            <Shield className="w-5 h-5 text-teal-400" />
            <h2 className="text-xl font-bold text-white">Profile Details</h2>
          </div>

          <div className="grid gap-6">
            {/* Email Field */}
            <div className="group">
              <label className="block text-slate-400 text-sm font-medium mb-2 flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email Address
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={user.email}
                  disabled
                  className="w-full px-4 py-3 rounded-xl bg-zinc-800/50 text-slate-400 border border-slate-600/50 cursor-not-allowed transition-all duration-200"
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                  <div className="w-2 h-2 bg-slate-500 rounded-full"></div>
                </div>
              </div>
            </div>

            {/* Name Field */}
            <div className="group">
              <label className="block text-slate-400 text-sm font-medium mb-2 flex items-center gap-2">
                <User className="w-4 h-4" />
                Full Name
              </label>
              <input
                name="name"
                value={formData.name}
                disabled={!editMode}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-xl bg-zinc-800/50 border transition-all duration-200 ${
                  editMode
                    ? "text-white border-slate-600 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 focus:outline-none"
                    : "text-slate-300 border-slate-700/50"
                }`}
              />
            </div>

            {/* Work Field */}
            <div className="group">
              <label className="block text-slate-400 text-sm font-medium mb-2 flex items-center gap-2">
                <Briefcase className="w-4 h-4" />
                Work
                <span className="text-xs text-slate-500 ml-1">(Optional)</span>
              </label>
              <input
                name="work"
                value={formData.work}
                disabled={!editMode}
                onChange={handleChange}
                placeholder="Where do you work?"
                className={`w-full px-4 py-3 rounded-xl bg-zinc-800/50 border transition-all duration-200 ${
                  editMode
                    ? "text-white border-slate-600 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 focus:outline-none placeholder-slate-500"
                    : "text-slate-300 border-slate-700/50"
                }`}
              />
            </div>

            {/* School Field */}
            <div className="group">
              <label className="block text-slate-400 text-sm font-medium mb-2 flex items-center gap-2">
                <GraduationCap className="w-4 h-4" />
                Education
                <span className="text-xs text-slate-500 ml-1">(Optional)</span>
              </label>
              <input
                name="school"
                value={formData.school}
                disabled={!editMode}
                onChange={handleChange}
                placeholder="Where do you study?"
                className={`w-full px-4 py-3 rounded-xl bg-zinc-800/50 border transition-all duration-200 ${
                  editMode
                    ? "text-white border-slate-600 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 focus:outline-none placeholder-slate-500"
                    : "text-slate-300 border-slate-700/50"
                }`}
              />
            </div>
          </div>

          {/* Action Buttons */}
          {editMode && (
            <div className="flex justify-end gap-3 mt-8 pt-6 border-t border-slate-700/50">
              <button
                onClick={() => setEditMode(false)}
                className="px-6 py-2.5 rounded-xl bg-zinc-700/50 hover:bg-zinc-700 text-slate-300 hover:text-white border border-slate-600/50 transition-all duration-200"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={saveAnimation}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-500 hover:to-cyan-500 text-white font-medium shadow-lg hover:shadow-teal-500/25 transition-all duration-200 flex items-center gap-2 disabled:opacity-50"
              >
                {saveAnimation ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    Save Changes
                  </>
                )}
              </button>
            </div>
          )}

          {/* Danger Zone */}
          <div className="mt-10 pt-6 border-t border-red-900/30">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-red-400 font-semibold">Danger Zone</h3>
                <p className="text-slate-500 text-sm mt-1">
                  This action cannot be undone
                </p>
              </div>
              <button
                onClick={handleDeleteAccount}
                className="group px-4 py-2 bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 rounded-lg text-red-400 hover:text-red-300 transition-all duration-200 flex items-center gap-2"
              >
                <Trash2 className="w-4 h-4 group-hover:animate-pulse" />
                Delete Account
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
