import { useChatStore } from "../store/useChatStore";

function ActiveTabSwitch() {
  const { activeTab, setActiveTab } = useChatStore();

  return (
    <div className="tabs tabs-boxed bg-transparent p-3 m-2 flex gap-2">
      <button
        onClick={() => setActiveTab("chats")}
        className={`tab px-6 py-2 text-sm font-medium rounded-lg transition-all duration-200
          ${
            activeTab === "chats"
              ? "bg-cyan-500/20 text-cyan-400 shadow-md"
              : "text-slate-400 hover:text-cyan-300 hover:bg-white/5"
          }`}
      >
        Chats
      </button>

      <button
        onClick={() => setActiveTab("contacts")}
        className={`tab px-6 py-2 text-sm font-medium rounded-lg transition-all duration-200
          ${
            activeTab === "contacts"
              ? "bg-cyan-500/20 text-cyan-400 shadow-md"
              : "text-slate-400 hover:text-cyan-300 hover:bg-white/5"
          }`}
      >
        Contacts
      </button>
    </div>
  );
}

export default ActiveTabSwitch;
