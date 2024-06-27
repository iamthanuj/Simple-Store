import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/authContext";
import NavBar from "../components/NavBar";
import ProfileModal from "../components/ProfileModal";
import CardComponent from "../components/CardComponent";
import { usePosts } from "../contexts/postContext/PostContext";
import CreateContentModal from "../components/CreateContentModal";
import UpdateContentModal from "../components/UpdateContentModal";
import DeleteConfirmModal from "../components/DeleteConfirmModal";
import BeatLoader from "react-spinners/BeatLoader";

function Home() {
  const { currentUser, userLoggedIn } = useContext(AuthContext);
  const { posts, loading, error, deletePost, fetchPosts } = usePosts();
  const [openModal, setOpenModal] = useState(false);
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [currentPostId, setCurrentPostId] = useState(null);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const toggleModal = () => {
    setOpenModal(!openModal);
  };

  const toggleCreateeModal = () => {
    setOpenCreateModal(!openCreateModal);
  };

  const toggleUpdateModal = (postId) => {
    setCurrentPostId(postId);
    setOpenUpdateModal(!openUpdateModal);
  };

  const toggleDeleteModal = (postId) => {
    setCurrentPostId(postId);
    setOpenDeleteModal(!openDeleteModal);
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (!userLoggedIn) {
      navigate("/");
    }

    fetchPosts();
  }, [userLoggedIn, navigate]);

  if (loading) return <div className="h-screen flex justify-center items-center"><BeatLoader  size={20}  /></div>;
  if (error) return <div >Erro: {error}</div>;

  return (
    <div className="box-border ">
      <NavBar
        toggleModal={toggleModal}
        toggleCreateModal={toggleCreateeModal}
      />
      <div className="container mx-auto pt-[100px] px-5 grid grid-cols-1 sm:grid-cols-2 gap-8 ">
        {posts.length == 0
          ? "No Contents"
          : posts.map((post) => (
              <CardComponent
                key={post.id}
                title={post.title}
                desc={post.description}
                image={post.imageURL}
                onEdit={() => toggleUpdateModal(post.id)}
                onDelete={()=> toggleDeleteModal(post.id)}
              />
            ))}
      </div>
      {openModal && <ProfileModal toggleModal={toggleModal} />}
      {openCreateModal && (
        <CreateContentModal toggleCreateModal={toggleCreateeModal} />
      )}
      {openUpdateModal && (
        <UpdateContentModal
          toggleUpdateModal={toggleUpdateModal}
          postId={currentPostId}
        />
      )}
      {openDeleteModal && (
        <DeleteConfirmModal
          toggleDeleteModal={toggleDeleteModal}
          postId={currentPostId}
        />
      )}
    </div>
  );
}

export default Home;
