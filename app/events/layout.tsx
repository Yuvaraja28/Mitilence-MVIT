export default function EventsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div
      className="flex flex-col items-center"
    >
      <span
        className="w-[90%] lg:w-[80vw] font-medium sticky top-[12vh] lg:top-[14.5vh] z-30 bg-purple-700 text-white px-4 py-2 text-xl text-center rounded-3xl drop-shadow-lg shadow-xl"
      >
        Upcoming updates will provide detailed information about the events. Currently, the events page displays a complete list of events with placeholder images and descriptions.
      </span>
      {children}
    </div>
  );
}
