import type { StructureResolver } from "sanity/structure";
import { Settings, FileText, Building2, User, GraduationCap, ShoppingBag, Tags } from "lucide-react";

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title("JWB Singapore")
    .items([
      // Settings singleton (always at top)
      S.listItem()
        .title("Site Settings")
        .id("settings")
        .icon(Settings)
        .child(S.document().schemaType("settings").documentId("settings")),

      S.divider(),

      // Pages
      S.listItem()
        .title("Pages")
        .icon(FileText)
        .schemaType("page")
        .child(S.documentTypeList("page").title("Pages")),

      // Synagogues
      S.listItem()
        .title("Synagogues")
        .icon(Building2)
        .schemaType("synagogue")
        .child(S.documentTypeList("synagogue").title("Synagogues")),

      // People
      S.listItem()
        .title("People")
        .icon(User)
        .schemaType("person")
        .child(
          S.list()
            .title("People")
            .items([
              S.listItem()
                .title("All People")
                .child(
                  S.documentTypeList("person")
                    .title("All People")
                    .defaultOrdering([{ field: "order", direction: "asc" }])
                ),
              S.divider(),
              S.listItem()
                .title("Clergy")
                .child(
                  S.documentList()
                    .title("Clergy")
                    .filter('_type == "person" && category == "clergy"')
                ),
              S.listItem()
                .title("Staff")
                .child(
                  S.documentList()
                    .title("Staff")
                    .filter('_type == "person" && category == "staff"')
                ),
              S.listItem()
                .title("Board Members")
                .child(
                  S.documentList()
                    .title("Board Members")
                    .filter('_type == "person" && category == "board"')
                ),
              S.listItem()
                .title("Educators")
                .child(
                  S.documentList()
                    .title("Educators")
                    .filter('_type == "person" && category == "educator"')
                ),
            ])
        ),

      // Education Programs
      S.listItem()
        .title("Education Programs")
        .icon(GraduationCap)
        .schemaType("educationProgram")
        .child(
          S.list()
            .title("Education Programs")
            .items([
              S.listItem()
                .title("All Programs")
                .child(
                  S.documentTypeList("educationProgram").title("All Programs")
                ),
              S.divider(),
              S.listItem()
                .title("Preschool")
                .child(
                  S.documentList()
                    .title("Preschool")
                    .filter('_type == "educationProgram" && type == "preschool"')
                ),
              S.listItem()
                .title("Sunday School")
                .child(
                  S.documentList()
                    .title("Sunday School")
                    .filter(
                      '_type == "educationProgram" && type == "sunday-school"'
                    )
                ),
              S.listItem()
                .title("Day School")
                .child(
                  S.documentList()
                    .title("Day School")
                    .filter('_type == "educationProgram" && type == "day-school"')
                ),
              S.listItem()
                .title("Adult Education")
                .child(
                  S.documentList()
                    .title("Adult Education")
                    .filter('_type == "educationProgram" && type == "adult"')
                ),
              S.listItem()
                .title("Youth Programs")
                .child(
                  S.documentList()
                    .title("Youth Programs")
                    .filter('_type == "educationProgram" && type == "youth"')
                ),
            ])
        ),

      S.divider(),

      // Shop
      S.listItem()
        .title("Shop")
        .icon(ShoppingBag)
        .child(
          S.list()
            .title("Shop")
            .items([
              S.listItem()
                .title("All Products")
                .icon(ShoppingBag)
                .schemaType("product")
                .child(
                  S.documentTypeList("product")
                    .title("All Products")
                    .defaultOrdering([{ field: "name.en", direction: "asc" }])
                ),
              S.listItem()
                .title("Categories")
                .icon(Tags)
                .schemaType("productCategory")
                .child(
                  S.documentTypeList("productCategory")
                    .title("Categories")
                    .defaultOrdering([{ field: "order", direction: "asc" }])
                ),
              S.divider(),
              S.listItem()
                .title("Featured Products")
                .icon(ShoppingBag)
                .child(
                  S.documentList()
                    .title("Featured Products")
                    .filter('_type == "product" && featured == true')
                ),
              S.listItem()
                .title("Out of Stock")
                .icon(ShoppingBag)
                .child(
                  S.documentList()
                    .title("Out of Stock")
                    .filter('_type == "product" && inStock == false')
                ),
            ])
        ),
    ]);
