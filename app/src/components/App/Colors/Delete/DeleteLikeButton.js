import useMutation from "../../../../core/hooks/useMutation";
import Button from "../../../Design/Button/Button";
import Error from "../../../Design/Error/Error";

const DeleteLikeButton = ({ onSuccess, id }) => {
    const { isLoading, error, mutate } = useMutation();

    const handleClick = () => {
    mutate(`${process.env.REACT_APP_API_URL}/liked/${id}`, {
        method: "DELETE",
        onSuccess: () => {
        onSuccess();
        },
    });
    };

    // return error
    if(error) {
        return (
            <Error color="warning">{error}</Error>
        );
    }
    
    return (
    <Button color="warning" className="round" onClick={handleClick} disabled={isLoading}>
        🗑
    </Button>
    );
};

export default DeleteLikeButton;