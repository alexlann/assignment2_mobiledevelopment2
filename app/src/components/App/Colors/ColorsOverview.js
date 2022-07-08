import { useState } from "react";
import useFetch from "../../../core/hooks/useFetch";
import useMutation from "../../../core/hooks/useMutation";
import TimedLoader from "../../Design/Loader/TimedLoader";
import Error from "../../Design/Error/Error";
import Button from "../../Design/Button/Button";
import Container from "../../Design/Container/Container";

const ColorOverview = () => {
    const [index, setIndex] = useState(0);
    const { isLoadingMutate, errorMutate, mutate } = useMutation();
    
    const {
        isLoading,
        error,
        invalidate,
        data: colors
    } = useFetch("/colors");

    // return error
    if(error) {
        return (
            <Container className="flex">
                <Error color="warning">{error}</Error>
            </Container>
        );
    }

    if(errorMutate) {
        return (
            <Container className="flex">
                <Error color="warning">{errorMutate}</Error>
            </Container>
        );
    }


    // return loaderge
    if(isLoading || isLoadingMutate) {
        return (
            <Container className="flex">
                <TimedLoader
                    requirement={isLoading}
                />
            </Container>
        );
    }

    const increaseIndex = () => {
        if (index > 8) {
            invalidate()
            setIndex(0);
        } else {
            setIndex(index+1);
        }
    };

    const handleLike = () => {
        const color = colors[index];
        mutate(`${process.env.REACT_APP_API_URL}/liked/${color._id}`, {
            method: "POST",
            onSuccess: () => {
                increaseIndex();
            },
        });
    };

    const handleDislike = () => {
        const color = colors[index];
        mutate(`${process.env.REACT_APP_API_URL}/disliked/${color._id}`, {
            method: "POST",
            onSuccess: () => {
                increaseIndex();
            },
        });
    }

    if(colors[index]) {
        return (
            <>
                <div className="container flex container-color" key={colors[index]._id} style={{background: colors[index].hex_value}}>
                    {colors[index].hex_value}
                </div>
                <Container className="flex">
                    <Button
                        color="warning"
                        onClick={handleDislike}
                        disabled={isLoading}
                        className="large round"
                        >X
                    </Button>
                    <Button
                        onClick={handleLike}
                        disabled={isLoading}
                        className="large round"
                        >V
                    </Button>
                </Container>
            </>
        );
    } else {
        return (
            <Container className="flex">
                <Error>
                    There are no more colors left!
                </Error>
            </Container>
        )
    }
}

export default ColorOverview;