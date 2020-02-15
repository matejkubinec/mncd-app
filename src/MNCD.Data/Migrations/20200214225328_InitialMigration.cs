using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace MNCD.Data.Migrations
{
    public partial class InitialMigration : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "AnalysisSessions",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Name = table.Column<string>(nullable: true),
                    CreateDate = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AnalysisSessions", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "NetworkInfos",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    NodeCount = table.Column<int>(nullable: false),
                    EdgeCount = table.Column<int>(nullable: false),
                    LayerCount = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_NetworkInfos", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "DataSets",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Name = table.Column<string>(nullable: true),
                    Hash = table.Column<string>(nullable: true),
                    Content = table.Column<string>(nullable: true),
                    FileType = table.Column<int>(nullable: false),
                    InfoId = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DataSets", x => x.Id);
                    table.ForeignKey(
                        name: "FK_DataSets_NetworkInfos_InfoId",
                        column: x => x.InfoId,
                        principalTable: "NetworkInfos",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "AnalysisRequests",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    CreateDate = table.Column<DateTime>(nullable: false),
                    DatasetId = table.Column<int>(nullable: true),
                    SelectedLayer = table.Column<int>(nullable: true),
                    Approach = table.Column<int>(nullable: false),
                    AnalysisAlgorithm = table.Column<int>(nullable: false),
                    AnalysisAlgorithmParameters = table.Column<string>(nullable: true),
                    FlattenningAlgorithm = table.Column<int>(nullable: false),
                    FlattenningAlgorithmParameters = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AnalysisRequests", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AnalysisRequests_DataSets_DatasetId",
                        column: x => x.DatasetId,
                        principalTable: "DataSets",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Analyses",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Order = table.Column<int>(nullable: false),
                    RequestId = table.Column<int>(nullable: true),
                    AnalysisSessionId = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Analyses", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Analyses_AnalysisSessions_AnalysisSessionId",
                        column: x => x.AnalysisSessionId,
                        principalTable: "AnalysisSessions",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Analyses_AnalysisRequests_RequestId",
                        column: x => x.RequestId,
                        principalTable: "AnalysisRequests",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Analyses_AnalysisSessionId",
                table: "Analyses",
                column: "AnalysisSessionId");

            migrationBuilder.CreateIndex(
                name: "IX_Analyses_RequestId",
                table: "Analyses",
                column: "RequestId");

            migrationBuilder.CreateIndex(
                name: "IX_AnalysisRequests_DatasetId",
                table: "AnalysisRequests",
                column: "DatasetId");

            migrationBuilder.CreateIndex(
                name: "IX_DataSets_InfoId",
                table: "DataSets",
                column: "InfoId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Analyses");

            migrationBuilder.DropTable(
                name: "AnalysisSessions");

            migrationBuilder.DropTable(
                name: "AnalysisRequests");

            migrationBuilder.DropTable(
                name: "DataSets");

            migrationBuilder.DropTable(
                name: "NetworkInfos");
        }
    }
}
