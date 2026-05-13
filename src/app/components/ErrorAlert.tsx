export default function Error({message}:{message: string}){
    return (
    <>
    <div className="alert alert-danger d-flex align-items-center mb-4" role="alert">
        <i className="bi bi-exclamation-circle text-danger me-2"></i>
        <div>
            {message}
        </div>
    </div>
    </>
    )
}