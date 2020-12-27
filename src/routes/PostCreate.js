import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import PostForm from 'components/post/PostForm';
import { accountSelector } from 'stores/accounts';
import { createPost } from 'apis/posts';

export default function PostCreate() {
    const history = useHistory();
    const [error, setError] = useState("");
    const account = useRecoilValue(accountSelector);

    const onSubmit = async (title, content) => {
        const response = await createPost(title, content, account.access_token);
        
        if (response.error !== "") {
            setError(response.error);
            return <>{error}</>;
        }
        history.push("/");
        return <></>;
    };

    if (account.username === "" || account.access_token === "") {
        history.push("/");
        return <></>
    }

    return (
        <div className="post__create">
            <PostForm initTitle="" initContent="" onSubmit={onSubmit} />
        </div>
    );
}
