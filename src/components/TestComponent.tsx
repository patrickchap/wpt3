import { NextPage } from "next";

const Test: NextPage<{title: string}> = ({ title }) => {
    return (
        <>
            <h1 className="mt-8 text-3xl font-bold text-primary text-center mb-8">{title}</h1>
            <p className="pb-8 md:pb-3">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nulla facilisi nullam vehicula ipsum a arcu cursus vitae congue. Aliquet bibendum enim facilisis gravida. Amet tellus cras adipiscing enim eu turpis egestas pretium. In pellentesque massa placerat duis. Amet dictum sit amet justo. Ultrices tincidunt arcu non sodales neque sodales. Id interdum velit laoreet id donec ultrices. Ultrices eros in cursus turpis. Tempus iaculis urna id volutpat. Amet aliquam id diam maecenas ultricies. Dis parturient montes nascetur ridiculus mus mauris vitae ultr.</p>
            <p className="pb-8 md:pb-3">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nulla facilisi nullam vehicula ipsum a arcu cursus vitae congue. Aliquet bibendum enim facilisis gravida. Amet tellus cras adipiscing enim eu turpis egestas pretium. In pellentesque massa placerat duis. Amet dictum sit amet justo. Ultrices tincidunt arcu non sodales neque sodales. Id interdum velit laoreet id donec ultrices. Ultrices eros in cursus turpis. Tempus iaculis urna id volutpat. Amet aliquam id diam maecenas ultricies. Dis parturient montes nascetur ridiculus mus mauris vitae ultr.</p>
            <p className="pb-8 md:pb-3">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nulla facilisi nullam vehicula ipsum a arcu cursus vitae congue. Aliquet bibendum enim facilisis gravida. Amet tellus cras adipiscing enim eu turpis egestas pretium. In pellentesque massa placerat duis. Amet dictum sit amet justo. Ultrices tincidunt arcu non sodales neque sodales. Id interdum velit laoreet id donec ultrices. Ultrices eros in cursus turpis. Tempus iaculis urna id volutpat. Amet aliquam id diam maecenas ultricies. Dis parturient montes nascetur ridiculus mus mauris vitae ultr.</p>
        </>
    )

}

export default Test;
