import React, { useState, useRef } from 'react';
import Link from 'next/link';

const Subscribe = () => {
    const emailRef = useRef(null);
    const [loading, setLoading] = useState(false);
    const [err, setErr] = useState(null)

    const submitEmail = async (e) => {
        e.preventDefault();
        setLoading(true);
        const res = await fetch('/api/subscribe', {
            body: JSON.stringify({
                email: emailRef.current.value
            }),
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST'
        });

        setLoading(false);
        const { error } = await res.json();

        if (error) {
            //   toast({
            //     title: 'Oops something happened...',
            //     description: `${error}\n DM me if you can't figure out this issue.`,
            //     status: 'error',
            //     duration: 3000,
            //     isClosable: true
            //   });
            setErr(error)

            return;
        }
        emailRef.current.value = '';
        // toast({
        //   title: 'Thank you!',
        //   description: 'You are now subscribed.',
        //   status: 'success',
        //   duration: 3000,
        //   isClosable: true
        // });
    };

    return (
        <div>
            <h3>Sign up for my newsletter</h3>
            <p>I send out email every week-ish about what I'm thinking about. If you want to receive updated from me, sign up for my newsletter below.</p>
            <form onSubmit={submitEmail}>
                <label>
                    Email address:
                    <input className='email-input' type="email" name="email" required ref={emailRef} />
                </label>
                <input className='subscribe-button' type="submit" value={loading ? "..." : "Submit"} />
            </form>
            {err && <small className="subscribe-err">Oops! That didn't work... {err}. If this keeps happening, please <Link href='mailto:someone@priyankapdhavingfun@gmail.com'><a>email me</a></Link>.</small>}
            {(loading && !err) && <small className='subscribe-success'>Thank you for subscribing!</small>}
        </div>
    )
};

export default Subscribe;
