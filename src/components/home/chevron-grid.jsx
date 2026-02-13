import { useRef, useEffect } from "react";

/**
 * Codex-style interactive chevron grid.
 * Drop into any `position: relative` container — it listens
 * to mousemove / mouseleave on its parent element automatically.
 */
export function ChevronGrid() {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const rafRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const parent = canvas.parentElement;
    if (!parent) return;

    const ctx = canvas.getContext("2d");
    const dpr = window.devicePixelRatio || 1;

    const CELL = 34;
    const RADIUS = 220;
    const EASE = 0.07;

    let w, h, grid;

    function init() {
      w = parent.offsetWidth;
      h = parent.offsetHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const cols = Math.ceil(w / CELL) + 1;
      const rows = Math.ceil(h / CELL) + 1;
      grid = [];
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const rand = Math.random();
          grid.push({
            x: c * CELL + (r % 2 ? CELL / 2 : 0),
            y: r * CELL,
            type: rand < 0.6 ? "chevron" : rand < 0.82 ? "dash" : "dot",
            size: 5 + Math.random() * 4,
            opacity: 0,
          });
        }
      }
    }

    function drawChevron(x, y, angle, size, opacity) {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(angle);
      ctx.beginPath();
      ctx.moveTo(-size * 0.38, -size * 0.48);
      ctx.lineTo(size * 0.38, 0);
      ctx.lineTo(-size * 0.38, size * 0.48);
      ctx.strokeStyle = `rgba(255,255,255,${opacity})`;
      ctx.lineWidth = 1.4;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.stroke();
      ctx.restore();
    }

    function drawDash(x, y, angle, size, opacity) {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(angle);
      ctx.beginPath();
      ctx.moveTo(-size * 0.45, 0);
      ctx.lineTo(size * 0.45, 0);
      ctx.strokeStyle = `rgba(255,255,255,${opacity})`;
      ctx.lineWidth = 1.4;
      ctx.lineCap = "round";
      ctx.stroke();
      ctx.restore();
    }

    function drawDot(x, y, size, opacity) {
      ctx.beginPath();
      ctx.arc(x, y, size * 0.18, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255,255,255,${opacity})`;
      ctx.fill();
    }

    function frame() {
      ctx.clearRect(0, 0, w, h);
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      for (let i = 0; i < grid.length; i++) {
        const cell = grid[i];
        const dx = cell.x - mx;
        const dy = cell.y - my;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const target =
          dist < RADIUS ? Math.pow(1 - dist / RADIUS, 1.6) * 0.38 : 0;
        cell.opacity += (target - cell.opacity) * EASE;

        if (cell.opacity < 0.004) continue;

        const angle = Math.atan2(dy, dx) + Math.PI;

        if (cell.type === "chevron") {
          drawChevron(cell.x, cell.y, angle, cell.size, cell.opacity);
        } else if (cell.type === "dash") {
          drawDash(cell.x, cell.y, angle, cell.size, cell.opacity);
        } else {
          drawDot(cell.x, cell.y, cell.size, cell.opacity);
        }
      }

      rafRef.current = requestAnimationFrame(frame);
    }

    function onMouseMove(e) {
      const rect = parent.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    }

    function onMouseLeave() {
      mouseRef.current = { x: -1000, y: -1000 };
    }

    init();
    frame();

    parent.addEventListener("mousemove", onMouseMove);
    parent.addEventListener("mouseleave", onMouseLeave);
    window.addEventListener("resize", init);

    return () => {
      parent.removeEventListener("mousemove", onMouseMove);
      parent.removeEventListener("mouseleave", onMouseLeave);
      window.removeEventListener("resize", init);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0"
    />
  );
}
