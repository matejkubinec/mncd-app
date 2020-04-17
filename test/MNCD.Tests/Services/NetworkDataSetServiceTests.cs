using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using MNCD.Data;
using MNCD.Domain.Entities;
using MNCD.Domain.Exceptions;
using MNCD.Domain.Services;
using MNCD.Services.Impl;
using Xunit;

namespace MNCD.Tests.Services
{
    public class NetworkDataSetServiceTests
    {
        [Fact]
        public async Task AddDataSet_NameInvalid()
        {
            using (var ctx = InitCtx(nameof(AddDataSet_NameInvalid)))
            {
                var service = InitService(ctx);
                await Assert.ThrowsAsync<ArgumentException>(() => service.AddDataSet(string.Empty, "0 1", FileType.EdgeList));
                await Assert.ThrowsAsync<ArgumentException>(() => service.AddDataSet(null, "0 1", FileType.EdgeList));
            }
        }

        [Fact]
        public async Task AddDataSet_ContentInvalid()
        {
            using (var ctx = InitCtx(nameof(AddDataSet_ContentInvalid)))
            {
                var service = InitService(ctx);
                await Assert.ThrowsAsync<ArgumentException>(() => service.AddDataSet("Data set 2", string.Empty, FileType.EdgeList));
                await Assert.ThrowsAsync<ArgumentException>(() => service.AddDataSet("Data set 2", null, FileType.EdgeList));
            }
        }

        [Fact]
        public async Task AddDataSet_HashExists()
        {
            using (var ctx = InitCtx(nameof(AddDataSet_HashExists)))
            {
                var service = InitService(ctx);
                await Assert.ThrowsAsync<NetworkDataSetExistsException>(() => service.AddDataSet("Data set 2", "0 0 1 0 1", FileType.EdgeList));
            }
        }

        [Fact]
        public async Task AddDataSet_Valid()
        {
            using (var ctx = InitCtx(nameof(AddDataSet_Valid)))
            {
                var service = InitService(ctx);
                var dataSet = await service.AddDataSet("Data set 2", "0 0 1 0 1\n 0 1 1 1 1", FileType.EdgeList);

                Assert.Equal(2, dataSet.Id);
                Assert.Equal(2, dataSet.NetworkInfo.NodeCount);
                Assert.Equal(2, dataSet.NetworkInfo.LayerCount);
                Assert.Equal(2, dataSet.NetworkInfo.EdgeCount);
            }
        }

        [Fact]
        public async Task DeleteDataSet_InvalidId()
        {
            using (var ctx = InitCtx(nameof(DeleteDataSet_InvalidId)))
            {
                var service = InitService(ctx);
                await Assert.ThrowsAsync<ArgumentException>(() => service.DeleteDataSet(0));
                await Assert.ThrowsAsync<ArgumentException>(() => service.DeleteDataSet(-1));
            }
        }

        [Fact]
        public async Task DeleteDataSet_NotFound()
        {
            using (var ctx = InitCtx(nameof(DeleteDataSet_NotFound)))
            {
                var service = InitService(ctx);
                await Assert.ThrowsAsync<NetworkDataSetNotFoundException>(() => service.DeleteDataSet(404));
            }
        }

        [Fact]
        public async Task DeleteDataSet_Valid()
        {
            using (var ctx = InitCtx(nameof(DeleteDataSet_Valid)))
            {
                var service = InitService(ctx);
                await service.DeleteDataSet(1);

                var dataSets = await service.GetDataSets();
                var dataSet = await service.GetDataSet(1);

                Assert.Empty(dataSets);
                Assert.Equal(1, dataSet.Id);
                Assert.True(dataSet.Deleted);
            }
        }

        [Fact]
        public async Task GetDataSet_InvalidId()
        {
            using (var ctx = InitCtx(nameof(GetDataSet_InvalidId)))
            {
                var service = InitService(ctx);
                await Assert.ThrowsAsync<ArgumentException>(() => service.GetDataSet(0));
                await Assert.ThrowsAsync<ArgumentException>(() => service.GetDataSet(-1));
            }
        }

        [Fact]
        public async Task GetDataSet_NotFound()
        {
            using (var ctx = InitCtx(nameof(GetDataSet_NotFound)))
            {
                var service = InitService(ctx);
                await Assert.ThrowsAsync<NetworkDataSetNotFoundException>(() => service.GetDataSet(404));
            }
        }

        [Fact]
        public async Task GetDataSet_Valid()
        {
            using (var ctx = InitCtx(nameof(GetDataSet_Valid)))
            {
                var service = InitService(ctx);
                var dataSet = await service.GetDataSet(1);

                Assert.Equal(1, dataSet.Id);
                Assert.Equal("Data set 1", dataSet.Name);
                Assert.Equal(2, dataSet.NetworkInfo.NodeCount);
                Assert.Equal(1, dataSet.NetworkInfo.LayerCount);
                Assert.Equal(1, dataSet.NetworkInfo.EdgeCount);
            }
        }

        [Fact]
        public async Task UpdateDataSet_InvalidId()
        {
            using (var ctx = InitCtx(nameof(UpdateDataSet_InvalidId)))
            {
                var service = InitService(ctx);
                await Assert.ThrowsAsync<ArgumentException>(() => service.UpdateDataSet(0, "Data set with new name"));
                await Assert.ThrowsAsync<ArgumentException>(() => service.UpdateDataSet(-1, "Data set with new name"));
            }
        }

        [Fact]
        public async Task UpdateDataSet_InvalidName()
        {
            using (var ctx = InitCtx(nameof(UpdateDataSet_InvalidName)))
            {
                var service = InitService(ctx);
                await Assert.ThrowsAsync<ArgumentException>(() => service.UpdateDataSet(1, string.Empty));
                await Assert.ThrowsAsync<ArgumentException>(() => service.UpdateDataSet(1, null));
            }
        }

        [Fact]
        public async Task UpdateDataSet_NotFound()
        {
            using (var ctx = InitCtx(nameof(UpdateDataSet_NotFound)))
            {
                var service = InitService(ctx);
                await Assert.ThrowsAsync<NetworkDataSetNotFoundException>(() => service.UpdateDataSet(404, "Data set with new name"));
            }
        }

        [Fact]
        public async Task UpdateDataSet_Valid()
        {
            using (var ctx = InitCtx(nameof(UpdateDataSet_Valid)))
            {
                var service = InitService(ctx);
                var dataSet = await service.UpdateDataSet(1, "Data set with new name");
                var dataSets = await service.GetDataSets();

                Assert.Equal("Data set with new name", dataSet.Name);
                Assert.Collection(dataSets, d => Assert.Equal("Data set with new name", d.Name));

            }
        }

        private INetworkDataSetService InitService(MNCDContext ctx)
        {
            return new NetworkDataSetService(ctx, _hasher, _reader);
        }

        private MNCDContext InitCtx(string databaseName)
        {
            var options = new DbContextOptionsBuilder<MNCDContext>()
                .UseInMemoryDatabase(databaseName)
                .Options;
            var ctx = new MNCDContext(options);
            ctx.DataSets.RemoveRange(ctx.DataSets);
            ctx.SaveChanges();
            var edgeList = "0 0 1 0 1";
            var dataSet = new NetworkDataSet
            {
                Content = edgeList,
                FileType = FileType.EdgeList,
                EdgeList = edgeList,
                Name = "Data set 1",
                Hash = _hasher.GetHashFor(edgeList),
            };
            var info = new NetworkInfo
            {
                ActorNames = new List<string> { "A0", "A1" },
                EdgeCount = 1,
                LayerCount = 1,
                LayerNames = new List<string> { "L1" },
                NodeCount = 2,
                NetworkDataSet = dataSet
            };
            dataSet.NetworkInfo = info;
            ctx.DataSets.Add(dataSet);
            ctx.SaveChanges();
            return new MNCDContext(options);
        }

        private static IHashService _hasher = new HashService();

        private static IReaderService _reader = new ReaderService();
    }
}