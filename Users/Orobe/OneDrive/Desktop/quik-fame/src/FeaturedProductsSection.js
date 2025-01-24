import React from "react";
import styled from "styled-components";

const FeaturedProductsSection = () => {
  return (
    <Container>
      <SectionTitle>Featured Products</SectionTitle>
      <ProductGrid>
        <ProductItem>
          <ProductImage
            src="https://www.bing.com/th/id/OGC.0737d5adb1990cc77cb9ec0161ec9eff?pid=1.7&rurl=https%3a%2f%2fcdn.dribbble.com%2fusers%2f1923171%2fscreenshots%2f5676763%2fchien.gif&ehk=0XXW9BJnH3N25RdkjmvlHXwg2m%2fn%2fUEQVc1DdQQHc7g%3d"
            alt="YouTube"
          />
          <ProductName>YouTube</ProductName>
          <ProductDescription>
            Discover and enjoy videos you love. Get instant boost for your
            YouTube channel.
          </ProductDescription>
          <ProductPrice>$19.99</ProductPrice>
          <ProductButton>Add to Cart</ProductButton>
        </ProductItem>
        <ProductItem>
          <ProductImage
            src="https://www.bing.com/th/id/OGC.86ecad477424886f4801d765645629e6?pid=1.7&rurl=https%3a%2f%2fcdn.dribbble.com%2fusers%2f1238327%2fscreenshots%2f10519604%2ftiktok_logo.gif&ehk=rmQUwfNzos%2b5gZukBJoPiMWjeMP5Gw0H4JUJhmwqawE%3d"
            alt="TikTok"
          />
          <ProductName>TikTok</ProductName>
          <ProductDescription>
            Explore trending short videos. Boost your TikTok presence instantly.
          </ProductDescription>
          <ProductPrice>$24.99</ProductPrice>
          <ProductButton>Add to Cart</ProductButton>
        </ProductItem>
        <ProductItem>
          <ProductImage
            src="https://cdn.dribbble.com/users/562663/screenshots/2712227/ins.gif"
            alt="Instagram"
          />
          <ProductName>Instagram</ProductName>
          <ProductDescription>
            Share your photos and stories. Get more visibility for your
            Instagram profile.
          </ProductDescription>
          <ProductPrice>$29.99</ProductPrice>
          <ProductButton>Add to Cart</ProductButton>
        </ProductItem>
      </ProductGrid>
    </Container>
  );
};

const Container = styled.div`
  background-color: #f9f9f9;
  padding: 80px 0;
`;

const SectionTitle = styled.h2`
  text-align: center;
  font-size: 3rem;
  margin-bottom: 40px;
  color: #333;
`;

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 40px;
`;

const ProductItem = styled.div`
  background-color: #fff;
  padding: 30px;
  border-radius: 20px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const ProductImage = styled.img`
  max-width: 100%;
  height: auto;
  border-radius: 20px;
  margin-bottom: 20px;
`;

const ProductName = styled.h3`
  font-size: 2.5rem;
  margin-bottom: 10px;
  color: #333;
`;

const ProductDescription = styled.p`
  font-size: 1.5rem;
  color: #666;
  margin-bottom: 20px;
`;

const ProductPrice = styled.p`
  font-size: 2rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 20px;
`;

const ProductButton = styled.button`
  background-color: #4caf50;
  color: #fff;
  border: none;
  border-radius: 30px;
  padding: 15px 40px;
  font-size: 1.5rem;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #45a049;
  }
`;

export default FeaturedProductsSection;
