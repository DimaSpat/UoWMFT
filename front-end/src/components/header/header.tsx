import {component$} from "@builder.io/qwik";
import {Link} from "@builder.io/qwik-city";

export const Header = component$((props:any) => {
    return (
        <header style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "1rem",
        }}>
            <div>
                <Link href={"/"}><h1>UoWMFT</h1></Link>
            </div>
            <div>
                {props.user ? (
                    <p>Log out</p> // TODO: add logout functionality
                ) : (
                    <Link href={"/auth"}>Authenticate</Link>
                )}
            </div>
        </header>
    )
})