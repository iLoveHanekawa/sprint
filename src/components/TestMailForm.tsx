import React, { FormEvent } from "react";

export default function TestMailForm() {

    async function onSubmitHandler(event: FormEvent<HTMLFormElement>) {
        // TODO client url
        event.preventDefault();
        const res = await fetch("http://localhost:3000/sprint/send", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            }
        });
        const data = await res.json();
        console.log(data);
    }

    return <form onSubmit={onSubmitHandler}>
        <button type="submit">Test mail</button>
    </form>
}