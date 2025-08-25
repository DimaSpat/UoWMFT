import {$, component$, Signal, useSignal} from "@builder.io/qwik";
import {DocumentHead, Link} from "@builder.io/qwik-city";

const BASE_URL = "http://localhost:5000/"; //process.env.BASE_URL ||

const API_ENDPOINTS = {
    GOOGLE: BASE_URL+'api/auth/google',
    TELEGRAM: BASE_URL+'api/auth/telegram',
}

export default component$(() => {
    const isSigningIn:Signal<boolean> = useSignal(false);
    const isLoading:Signal<boolean> = useSignal(false);
    const formRef:Signal<HTMLFormElement | undefined> = useSignal(undefined);
    const result:Signal<any | undefined> = useSignal(undefined);

    const changeAuthState = $(() => {
        isSigningIn.value = !isSigningIn.value;
        formRef.value?.reset();
        result.value = undefined;
    });

    const submitForm = $(async () => {
        isLoading.value = true;
        result.value = undefined;

        try {

            const formData = Object.fromEntries(new FormData(formRef.value!).entries());

            if (isSigningIn && formData.password !== formData.confirmPassword) {
                result.value = {
                    success: false,
                    message: "Passwords do not match",
                }
                formRef.value?.reset();
                isLoading.value = false;
                return;
            }
        } catch (e) {
            console.log(e);
        }

        formRef.value?.reset();
        isLoading.value = false;
    });

    return (
        <div style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
        }}>
            <div style={{
                border: "4px solid rgb(25, 25, 25)",
                backgroundColor: "rgb(25, 25, 25)",
                overflow: "hidden",
                width: "32rem",
            }}>
                <div style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    height: "4rem",
                }}>
                    <button
                        style={{
                            background: !isSigningIn.value ? "rgb(25, 25, 25)" : "black",
                            cursor: isSigningIn.value ? "not-allowed" : "pointer",
                            border: "none",
                        }}
                        onClick$={changeAuthState}
                        disabled={isSigningIn.value}
                    >Sign in</button>
                    <button
                        style={{
                            background: isSigningIn.value ? "rgb(25, 25, 25)" : "black",
                            cursor: !isSigningIn.value ? "not-allowed" : "pointer",
                            border: "none",
                        }}
                        onClick$={changeAuthState}
                        disabled={!isSigningIn.value}
                    >Log in</button>
                </div>
                <div style={{
                    padding: "1rem",
                }}>
                    {isSigningIn.value ? (
                        <>
                            <h2>Register to start playing</h2>
                            <form ref={formRef} preventdefault:submit={true} onSubmit$={submitForm} style={{
                                display: "flex",
                                flexDirection: "column",
                                gap: "1rem",
                                marginTop: "1rem",
                                marginBottom: "1rem",
                            }}>
                                <input type="email" name="email" required={true} placeholder="Email" style={{
                                    background: "rgb(35, 35, 35)",
                                    border: "none",
                                    color: "white",
                                    padding: "1rem",
                                }} />
                                <input type="password" name="password" required={true} placeholder="Password" style={{
                                    background: "rgb(35, 35, 35)",
                                    border: "none",
                                    color: "white",
                                    padding: "1rem",
                                }} />
                                <input type="password" name="confirmPassword" required={true} placeholder="Confirm Password" style={{
                                    background: "rgb(35, 35, 35)",
                                    border: "none",
                                    color: "white",
                                    padding: "1rem",
                                }}/>
                                <button type={"submit"} disabled={isLoading.value} style={{
                                    background: "rgb(35, 35, 35)",
                                    border: "none",
                                    padding: "1rem",
                                }}>{isLoading.value ? "Loading..." : "Create Account"}</button>
                            </form>
                            {result.value && (
                                <p style={{
                                    color: result.value.success ? "green" : "red",
                                }}>{result.value.message}</p>
                            )}
                        </>
                    ) : (
                        <>
                            <h2>Enter back in your progress</h2>
                            <form ref={formRef} preventdefault:submit={true} onSubmit$={submitForm} style={{
                                display: "flex",
                                flexDirection: "column",
                                gap: "1rem",
                                marginTop: "1rem",
                                marginBottom: "1rem",
                            }}>
                                <input type="text" name="email" required={true} placeholder="Email" style={{
                                    background: "rgb(35, 35, 35)",
                                    border: "none",
                                    color: "white",
                                    padding: "1rem",
                                }}/>
                                <input type="password" name="password" required={true} placeholder="Password" style={{
                                    background: "rgb(35, 35, 35)",
                                    border: "none",
                                    color: "white",
                                    padding: "1rem",
                                }}/>
                                <button type={"submit"} disabled={isLoading.value} style={{
                                    background: "rgb(35, 35, 35)",
                                    border: "none",
                                    padding: "1rem",
                                }}>{isLoading.value ? "Loading..." : "Enter"}</button>
                            </form>
                            {result.value && (
                                <p style={{
                                    color: result.value.success ? "green" : "red",
                                }}>{result.value.message}</p>
                            )}
                        </>
                    )}
                </div>
                <div style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "1rem",
                    padding: "1rem",
                }}>
                    <Link href={API_ENDPOINTS.GOOGLE} style={{
                        background: "#0F9D58",
                        textAlign: "center",
                        color: "white",
                        border: "none",
                        padding: "0.5rem 1rem",
                        cursor: "pointer",
                    }}>Continue with Google</Link>
                    <Link href={API_ENDPOINTS.TELEGRAM} style={{
                        background: "#229ED9",
                        textAlign: "center",
                        color: "white",
                        border: "none",
                        padding: "0.5rem 1rem",
                        cursor: "pointer",
                    }}>Continue with Telegram</Link>
                </div>
            </div>
        </div>
    );
});

export const head: DocumentHead = {
    title: "Auth",
    meta: [
        {
            name: "description",
            content: "Authenticating into the system",
        },
    ],
};