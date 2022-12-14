interface iContentProps {
    children: any;
}
export default function Content({children}:iContentProps) {
    return (
        <main className="flex flex-col mt-7 dark:text-gray-200">
            {children}
        </main>
    );
}