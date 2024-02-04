import styled from "@emotion/styled"
import grassImage from "../assets/grass.png"
import image404 from "../assets/404.png"

const Page404 = () => {

    const BackgroundImage = styled.div`
        background-image: url(${grassImage});
        width: 100%;
    `

    return (
        <BackgroundImage className="bg-cover bg-no-repeat h-screen">
            <div className="grid place-items-center h-screen">
                <img src={image404} alt="404 page" />
            </div>
        </BackgroundImage>
    )
}

export default Page404