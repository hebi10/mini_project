function Upload() {
  return (
    <div class="container mt-3">
      <input
        type="text"
        class="form-control mt-2"
        id="title"
        placeholder="title"
      />
      <input
        type="text"
        class="form-control mt-2"
        id="content"
        placeholder="content"
      />
      <input class="form-control mt-2" type="file" id="image" />
      <button class="btn btn-danger mt-3" id="send">
        올리기
      </button>
    </div>
  );
}

export default Upload;
