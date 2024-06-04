import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/authContext";
import NavBar from "../components/NavBar";
import ProfileModal from "../components/ProfileModal";
import CardComponent from "../components/CardComponent";
import { usePosts } from "../contexts/postContext/PostContext";
import CreateContentModal from "../components/CreateContentModal";
import UpdateContentModal from "../components/UpdateContentModal";

function Home() {
  const { currentUser, userLoggedIn } = useContext(AuthContext);
  const { posts, loading, error, deletePost, fetchPosts } = usePosts();
  const [openModal, setOpenModal] = useState(false);
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [openUpdateModal, setOpenUpdateModal] = useState(false); // State to manage UpdateContentModal visibility
  const [currentPostId, setCurrentPostId] = useState(null); // State to store the current post ID for updating

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

  const navigate = useNavigate();

  useEffect(() => {
    if (!userLoggedIn) {
      navigate("/");
    }

    fetchPosts();
  }, [userLoggedIn, navigate]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="box-border ">
      <NavBar
        toggleModal={toggleModal}
        toggleCreateModal={toggleCreateeModal}
      />
      <div className="container mx-auto pt-[100px] px-5 grid grid-cols-2 gap-8 ">
        {posts.length == 0
          ? "No Contents"
          : posts.map((post) => (
              <CardComponent
                key={post.id}
                title={post.title}
                desc={post.description}
                image={post.imageURL}
                onEdit={() => toggleUpdateModal(post.id)}
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
          postId={currentPostId} // Pass the current post ID to the UpdateContentModal
        />
      )}
    </div>
  );
}

export default Home;
