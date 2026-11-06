'use client';

export default function BotonEliminar({ id, volver, action }) {
  return (
    <form
      action={action}
      onSubmit={(event) => {
        const confirmado = window.confirm(
          '¿Eliminar definitivamente este comentario? Esta acción no se puede deshacer.'
        );

        if (!confirmado) event.preventDefault();
      }}
    >
      <input type="hidden" name="id" value={id} />
      <input type="hidden" name="volver" value={volver} />
      <button
        type="submit"
        className="px-3 py-1.5 text-xs text-[#9C3B2E] hover:bg-[#C0503F]/10 transition-colors"
      >
        Eliminar
      </button>
    </form>
  );
}
