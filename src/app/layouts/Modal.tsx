export default function Modal({data}:string){
    return (
    <div className="modal fade" id="identiteModal" tabIndex={-1} aria-hidden="true">
        <div className="modal-dialog">
            <form action="" method="post">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5">Modification de lidentité</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <div className="mb-3">
                            <label className="form-label">Nom</label>
                            <input type="text" className="form-control" name="nom" />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Prénom</label>
                            <input type="text" className="form-control" name="prenom" />
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary bg-danger border-0" data-bs-dismiss="modal">Annuler</button>
                        <button type="submit" className="btn btn-primary bg-success border-0" name="identity">Modifier</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
    )
}