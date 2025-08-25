import {component$} from "@builder.io/qwik";
import {Link} from "@builder.io/qwik-city";

export const Header = component$((props:any) => {
    return (
        <header>
            <div>
                <Link href={"/"}><h1>UoWMFT</h1></Link>
                <div>
                    {props.user ? (
                        <p>Log out</p> // TODO: add logout functionality
                    ) : (
                        <Link href={"/auth"}>Log in</Link>
                    )}
                </div>
            </div>
        </header>
    )
})