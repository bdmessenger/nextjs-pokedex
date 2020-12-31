import Head from 'next/head'

const Layout = ({ children, title }) => (
    <div className="bg-gray-300">
        <Head>
            <title>{title}</title>
            <link rel="icon" href="/favicon.ico" />
            <link rel="preconnect" href="https://fonts.gstatic.com"/>
        </Head>

        <header className="text-black opacity-70 text-sm">Developed By: Brant Messenger</header>
        <main className="container mx-auto max-w-screen-lg py-8 min-h-screen px-2 font-body">
            {children}
        </main>
    </div>
)

export default Layout