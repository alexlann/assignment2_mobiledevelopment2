import useFetch from "../../../core/hooks/useFetch";
import TimedLoader from "../../Design/Loader/TimedLoader";
import Error from "../../Design/Error/Error";
import List from "../../Design/List/List";
import DeleteLikeButton from "./Delete/DeleteLikeButton";
import Container from "../../Design/Container/Container";

const LikesOverview = () => {
    const {
        isLoading,
        error,
        invalidate,
        data: likes
    } = useFetch("/likes");

    // return error
    if(error) {
        return (
            <Container className="flex">
                <Error color="warning">{error}</Error>
            </Container>
        );
    }
    // return loaderge
    if(isLoading) {
        return (
            <Container className="flex">
                <TimedLoader
                    requirement={isLoading}
                />
            </Container>
        );
    }

    const handleDeleteSuccess = () => {
        invalidate();
    };

    return (
        <Container className="flex">
            {likes.liked[0] ? (
                <List>
                    {likes.liked.map((like) => (
                        <li className="container-list" key={like._id} style={{background: like.hex_value}}>
                            {like.hex_value}
                            <DeleteLikeButton
                                id={like._id}
                                onSuccess={handleDeleteSuccess}
                            />
                        </li>
                    ))}
                </List>
            ) : (
                <Error>
                    You don't have any likes at the moment...
                </Error>
            )}
        </Container>
    );
}

export default LikesOverview;