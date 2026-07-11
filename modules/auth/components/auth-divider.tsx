export function AuthDivider() {
  return (
    <div className="relative my-1">
      <div className="absolute inset-0 flex items-center">
        <span className="w-full border-t border-slate-200" />
      </div>

      <div className="relative flex justify-center text-xs uppercase">
        <span className="bg-white px-3 text-[0.68rem] font-medium tracking-[0.14em] text-slate-400">
          Or continue with
        </span>
      </div>
    </div>
  );
}
