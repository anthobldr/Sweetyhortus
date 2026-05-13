"use client"
import { useState } from "react";
import { users, users_account } from "@/db/schema";
import Success from "@/app/components/SuccessAlert";
import Error from "@/app/components/ErrorAlert"
import { useRouter } from "next/navigation";

type User = typeof users.$inferSelect;
type Profil = typeof users_account.$inferSelect;

type Props = {
    user: User;
}

export default function SecurityClient({user}: Props){
    const router = useRouter();
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [responseType, setResponseType] = useState("")
    const [responseMessage, setResponseMessage] = useState("");
    const [deleteAccountModal, setDeleteAccountModal] = useState(false)
    const [deleteAccountPassword, setDeleteAccountPassword] = useState("")
    async function changePassword(e: React.FormEvent){
        e.preventDefault()
        const res = await fetch("/api/security/password",  {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({oldPassword, newPassword, confirmPassword})
        })
        if(res.ok){
            const status = await res.json()
            setResponseMessage(status.success)
            //console.log(status)
            if(status.success){
                setResponseType("success")
                setResponseMessage(status.success)
            } else {
                setResponseType("error")
                setResponseMessage(status.error)
            }
        }
    }
    async function deleteAccount(e: React.FormEvent){
        e.preventDefault()
        const res = await fetch("/api/security/delete", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({deleteAccountPassword})
        })
        if(res.ok){
            const status = await res.json()
            if(status.success){
                setDeleteAccountModal(false)
                router.push("/api/logout")
            } else {
                setDeleteAccountModal(false)
                setResponseType("error")
                setResponseMessage(status.error)
            }
        }

    }
    return (
        <>
            {responseType === "success" && <Success message={responseMessage} />}
            {responseType === "error" && <Error message={responseMessage} />}

            <h5>Sécurité</h5>
            <p>Ces informations doivent rester confidentiels. Prennez soins de ne pas les divulgués.</p>
            <hr />
            <div className="d-flex py-2">
                <div className="row">
                    <div className="col-5">
                        <h5>Mot de passe</h5>
                        <p>Mettez à jour le mot de passe associé à votre compte.</p>
                    </div>
                    <div className="col-6 ms-5">
                        <form action="" method="post">
                            <div className="mb-3">
                                <label className="form-label">Ancien mot de passe</label>
                                <input type="password" onChange={(e) => setOldPassword(e.target.value)} className="form-control" name="current_mdp" />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Nouveau mot de passe</label>
                                <input type="password" onChange={(e) => setNewPassword(e.target.value)} className="form-control" name="new_mdp" />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Confirmez le mot de passe</label>
                                <input type="password" onChange={(e) => setConfirmPassword(e.target.value)} className="form-control" name="repeat_mdp" />
                            </div>
                            <div className="d-flex justify-content-center">
                                <button type="button" onClick={changePassword} className="btn bg-success border-0 text-white">Modifier</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <hr />
            <div className="d-flex py-2">
                <div className="row">
                    <div className="col-5">
                        <h5>Supprimer le compte</h5>
                        <p>Vous ne souhaitez plus utiliser notre service ? Vous pouvez supprimer votre compte ici. Cette action est irréversible. Toutes les informations liées à ce compte seront supprimées définitivement.</p>
                    </div>
                    <div className="col-6 ms-5">
                        <div className="mb-3">
                            <form action="" method="post">
                                <button type="button" onClick={() => setDeleteAccountModal(true)} className="btn bg-danger mt-4 border-0 text-white" name="delete-account">Supprimer le compte</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <hr />
            {deleteAccountModal && (
                <>
                <div className="modal-backdrop fade show"></div>
                    <div className="modal fade show d-block" tabIndex={-1} role="dialog">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">
                                        Supression de votre compte
                                    </h5>
                                    <button type="button" className="btn-close" onClick={() => setDeleteAccountModal(false)}></button>
                                </div>
                                <div className="modal-body">
                                    <p>Confirmer votre mot de passe actuel pour suprimer votre compte</p>
                                    <div className="form-floating mb-3">
                                        <input type="text" className="form-control" onChange={(e) => setDeleteAccountPassword(e.target.value)} name="deleteAccountPassword" id="deleteAccountPassword" placeholder="Mot de passe" />
                                        <label htmlFor="deleteAccountPassword">Mot de passe</label>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button className="btn btn-secondary" onClick={() => setDeleteAccountModal(false)}>Fermer</button>
                                    <button className="btn bg-danger text-white" onClick={deleteAccount}>Confirmer</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    )
}