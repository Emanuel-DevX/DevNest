// ───────────────────────────────────────────────────────────────────────────────
// Reusable section wrapper
// ───────────────────────────────────────────────────────────────────────────────
function SectionCard({ id, title, icon: Icon, description, children, right }) {
  return (
    <section id={id} className="scroll-mt-24">
      <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-4 md:p-6">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            {Icon && <Icon className="h-5 w-5 text-teal-400" />}
            <div>
              <h2 className="text-lg font-semibold">{title}</h2>
              {description && (
                <p className="text-xs text-zinc-400 mt-0.5">{description}</p>
              )}
            </div>
          </div>
          {right}
        </div>
        <div className="mt-4">{children}</div>
      </div>
    </section>
  );
}

export default SectionCard;
