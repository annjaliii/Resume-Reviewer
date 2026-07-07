function UploadBox() {
  return (
    <section className="py-16">
      <div className="mx-auto max-w-4xl rounded-2xl border-2 border-dashed border-red-300 p-12 text-center">
        <h2 className="text-2xl font-bold">Upload Your Resume</h2>

        <p className="mt-3 text-gray-500">Drag & Drop your PDF here</p>

        <button className="mt-6 rounded-lg bg-red-600 px-6 py-3 text-white">
          Browse PDF
        </button>
      </div>
    </section>
  );
}

export default UploadBox;
