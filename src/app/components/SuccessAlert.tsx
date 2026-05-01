export default function Success({message}:{message: string}){
    return (
    <>
    <div className="alert alert-success d-flex align-items-center mb-4" role="alert">
        <i className="bi bi-check-circle-fill text-success me-2"></i>
        <div>
            {message}
        </div>
    </div>
    </>
    )
}