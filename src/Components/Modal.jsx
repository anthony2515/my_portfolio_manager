export default function Modal({isOpen,close,children}){
  if (!isOpen) return null;
  return (
    <div className="modal-overlay" onClick={close}>
    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
      {children}
      <button onClick={close}>Cancel</button>
    </div>
  </div>
    
  )
}