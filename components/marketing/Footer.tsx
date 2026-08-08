export default function Footer() {
  return (
    <footer className="border-t border-edge">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-3 px-6 py-10 text-center text-sm text-zinc-500">
        <div className="font-semibold text-zinc-300">Preuve AI</div>
        <p className="max-w-md text-xs">
          A demo idea-validation tool. Reports are AI-generated and meant as a
          starting point — verify anything important before you build.
        </p>
      </div>
    </footer>
  );
}
