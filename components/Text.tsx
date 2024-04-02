import React from "react";

function CustomText({
    text,
    className,
    heading
}: {
    text?: string;
    className?: string;
    heading?: boolean;
}) {
    // function truncateString(str: string, maxLength: number) {
    //     if (!str) {
    //         return ''; // Return an empty string if str is undefined or null
    //     }

    //     if (str.length <= maxLength) {
    //         return str;
    //     } else {
    //         return str.slice(0, maxLength) + "...";
    //     }
    // }

    return (
        heading ? (
            <h1 className={className}>{text}</h1>
        ) : (
            <p className={className}>{text}</p>
        )
    );
}

export default CustomText;
