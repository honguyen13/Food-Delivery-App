import { View, Text, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import CategoryCard from "./CategoryCard";
import { getPosts, urlFor } from "../config/sanitySetup";

const Categories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getPosts(`*[_type=="category"]`).then((data) => setCategories(data));
  }, []);

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingHorizontal: 15, paddingTop: 10 }}
    >
      {/**CategoryCard */}
      {categories
        ?.filter((category) => category.name == "Offers")
        .map((item) => (
          <CategoryCard
            key={item._id}
            title={item.name}
            imgUrl={urlFor(item.image).width(200).url()}
          />
        ))}

      {categories?.map((category) =>
        category.name != "Offers" ? (
          <CategoryCard
            key={category._id}
            title={category.name}
            imgUrl={urlFor(category.image).width(200).url()}
          />
        ) : null
      )}
    </ScrollView>
  );
};

export default Categories;
