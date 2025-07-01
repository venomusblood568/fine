import Aurora from "../assets/bg_arora";

export default function CustomBg() {
  return (
    <div>
      {/* Aurora Background */}
      <div className="absolute bg-transparent inset-0 z-0 opacity-30">
        <Aurora
          colorStops={["#3A29FF", "#2ded40", "#3a29ff"]}
          blend={0.31}
          amplitude={0.5}
          speed={0.6}
        />
      </div>
    </div>
  );
}
