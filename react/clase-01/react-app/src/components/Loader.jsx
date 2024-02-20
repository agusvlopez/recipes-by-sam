import React from 'react';

function Loader({ loaderType }) {
    const classLoader = loaderType || "loader";

    return (
        <div>
            <span
                className={classLoader}
            ></span>
        </div>
    );
}

export { Loader };